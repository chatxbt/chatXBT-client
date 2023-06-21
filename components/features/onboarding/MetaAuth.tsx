import { useState } from "react";
import style from "@styles/get-started/index.module.scss";
import { motion } from "framer-motion";
// import Logo from "../../shared/logo/Logo";
import Link from "next/link";
import * as BsIcons from "react-icons/bs";
import { auth } from "@chatxbt-sdk/services/auth";
import { useConnectionStore } from "@chatxbt-sdk/store/zustand/connection";

const MetaAuth = ({ handleStart }: any) => {
  const [step, setStep] = useState<number>(0);
  const authService = auth({})
  const { connectMetamask } = authService.action.walletSignIn();
  const { visibleAddress } = useConnectionStore();

  const nextStep = async () => {
    if (step === 0) {
      await connectMetamask();
    }
    setStep((i: any) => i + 1);
  };

  const goBack = () => {
    setStep((i: any) => i - 1);
  };

  const handleMetaAuthSteps = () => {
    switch (step) {
      case 0:
        return (
          <motion.div className={style.first}>
            <BsIcons.BsFillArrowLeftCircleFill
              id={style.back}
              onClick={handleStart}
            />
            <img src="/images/get-started/meta1.png" alt="" />

            <form onSubmit={(e) => e.preventDefault()}>
              <div className={style.formGroup}>
                <label htmlFor="">Enter password to unlock wallet</label>
                {/* <input type={"password"} placeholder="Password" /> */}
              </div>
              <button onClick={nextStep}>Unlock</button>
              {/* <button id={style.unlock}>Restore</button> */}
            </form>
          </motion.div>
        );

      case 1:
        return (
          <motion.div className={style.second}>
            <div id={style.logo}>
              <img src="/images/logo/logo-alt.png" alt="" />
              <Link href={"#"}>https://chatgpt.io</Link>
            </div>

            <label htmlFor="">Connect with Metamask</label>
            <small>Select account(s)</small>

            <div id={style.acctsCon}>
              <h3>Accounts</h3>
              <div id={style.hr}></div>
              <div id={style.accts}>
                <div id={style.acct}>
                  <div id={style.main}>
                    <div id={style.dp}></div>
                    <div id={style.details}>
                      <h3>Account 1</h3>
                      <small>{visibleAddress}</small>
                    </div>
                  </div>

                  <BsIcons.BsCheckCircle id={style.icon} />
                </div>
              </div>
              <div id={style.hr}></div>
            </div>
            <div id={style.btns}>
              <button onClick={goBack}>Cancel</button>
              <button onClick={nextStep} id={style.n}>
                Next
              </button>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div className={style.third}>
            <div id={style.logo}>
              <img src="/images/logo/logo-alt.png" alt="" />
              <Link href={"#"}>https://chatgpt.io</Link>
            </div>

            <label htmlFor="">Connect with Metamask</label>
            <small>Select account(s)</small>

            <div id={style.view}>
              <BsIcons.BsCheckCircle id={style.icon} />
              <h3>View the addresses of your permitted accounts (required)</h3>
            </div>

            <div id={style.btns}>
              <button onClick={goBack}>Back</button>
              <button onClick={nextStep} id={style.n}>
                Connect
              </button>
            </div>
          </motion.div>
        );

      // case 3:
      //   return (
      //     <motion.div className={style.fourth}>
      //       <div id={style.logo}>
      //         <div id={style.span}></div>
      //         <Link href={"#"}>https://chatgpt.io</Link>
      //       </div>

      //       <h3>Account 1</h3>
      //       <h1>Your signature is requested</h1>

      //       <h4>Message</h4>

      //       <div id={style.hr}></div>

      //       <input
      //         type="text"
      //         value={`Login for chatXBT guild: 77d92704-3f5e-6645-b250-2e5g7af8n565`}
      //       />

      //       <div id={style.btns}>
      //         <button onClick={goBack}>Cancel</button>
      //         <button onClick={nextStep} id={style.n}>
      //           Sign
      //         </button>
      //       </div>
      //     </motion.div>
      //   );

      default:
        return (
          <motion.div className={style.first}>
            <BsIcons.BsFillArrowLeftCircleFill
              id={style.back}
              onClick={handleStart}
            />
            <img src="/images/get-started/meta1.png" alt="" />

            <form action="">
              <div className={style.formGroup}>
                <label htmlFor="">Enter password to unlock wallet</label>
                <input type={"password"} placeholder="Password" />
              </div>
              <button onClick={goBack}>Unlock</button>
              <button id={style.unlock} onClick={goBack}>
                Restore
              </button>
            </form>
          </motion.div>
        );
    }
  };
  return <div className={style.metaAuthCon}>{handleMetaAuthSteps()}</div>;
};

export default MetaAuth;

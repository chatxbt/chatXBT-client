import style from "@styles/chat/activity.module.scss";

import _ from "@styles/coming-soon/index..module.scss";
import Image from "next/image";

const Activity = () => {
  return (
    <div className={style.placeholder_con}>
      <h1>Coming Soon</h1>
      <div>
        <img
          src={"/images/main/activity.jpg"}
          alt="activity"
          // width={700}
          // height={300}
        />
        <div>
          <h4>Activity</h4>
          <ol>
            <li>Gain invaluable insights into your past interactions.</li>
            <li>
              Your activity history provides valuable insights into your
              interactions on our platform.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Activity;

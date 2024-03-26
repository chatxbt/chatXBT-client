import TokenomicsPage from "./points";
import { chatxbtHooks } from "../chatxbt-sdk"

const Home = ({ action: {
  
}}) => {;
  return <TokenomicsPage/>;
};

export default (props: any) => <Home {...props} {...chatxbtHooks.useGamifyAppEntry(props)} />;


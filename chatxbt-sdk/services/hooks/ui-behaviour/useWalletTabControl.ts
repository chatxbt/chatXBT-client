import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useWalletTabControl = (page: string, tabLinks: any) => {
  const router = useRouter();
  const { tab } = router.query;

  const [selected, setSelected] = useState<any>();
  const handleSelect = (tabTitle: any) => {
    setSelected(tabTitle);
    let tab = tabLinks
      .filter((data: any) => data.title === tabTitle)
      .map((data: any) => data.url)
      .toString();

    router.push(
      {
        pathname: `/dashboard/${page}`,
        query: { tab },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    if (typeof window != "undefined") {
      let urlTab = tabLinks
        .filter((data: any) => data.url === tab)
        .map((data: any) => data.title)
        .toString();
      let tabTitles = tabLinks.map((data: any) => data.title)[0];
      urlTab ? setSelected(urlTab) : setSelected(tabTitles);
    }
  }, [tab]);

  return { handleSelect, selected };
};

export default useWalletTabControl;
import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [state, setState] = useState({ data: null, loading: true });

  useEffect(() => {
    setState((state) => ({ data: state.data, loading: true }));
    console.log("Made Fetch Request");
    fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "",
        "x-rapidapi-host": "",
      },
    })
      .then((x) => x.json())
      .then((y) => setState({ data: y, loading: false }));
  }, [url, setState]);

  return state;
};

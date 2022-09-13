import { mount } from "auth/AuthApp";
import { useHistory } from "react-router-dom";
import React, { useRef, useEffect } from "react";

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onSignIn,
      onNavigate: ({ pathname: nextPathName }) => {
        const { pathname } = history.location;
        if (pathname !== nextPathName) history.push(nextPathName);
      },
    });
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};

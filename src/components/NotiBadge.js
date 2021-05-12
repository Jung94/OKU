import React from "react";

import { Notifications } from "@material-ui/icons";
import { Badge } from "@material-ui/core";


const NotiBadge = (props) => {
  const [is_read, setIsRead] = React.useState(true);

  const notiCheck = () => {
    props._onClick();
  };

  return (
    <React.Fragment>
      <Badge
        invisible={is_read}
        color="secondary"
        onClick={notiCheck}
        variant="dot"
      >
        <Notifications />
      </Badge>
    </React.Fragment>
  );
};

NotiBadge.defaultProps = {
  _onClick: () => {},
};

export default NotiBadge;
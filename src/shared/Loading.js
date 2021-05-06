import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid, Text } from "elements/";
import { Color } from "shared/DesignSys";

//로딩스피너 만들기

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    flexGrow: 1,
  },
  top: {
    color: Color.Primary,
    animationDuration: "680ms",
  },
  circle: {
    strokeLinecap: "round",
  },
}));

function FacebookCircularProgress(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </div>
  );
}

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <Grid is_flex column bg="transparent">
      <div className={classes.root}>
        <FacebookCircularProgress />
      </div>
      <Text h3>조금만 기다려주세요!</Text>
    </Grid>
  );
}

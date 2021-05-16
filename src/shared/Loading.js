import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid, Text } from "elements/";
import { Color } from "shared/DesignSys";

//로딩스피너 만들기

const useStyles = makeStyles((theme) => ({
  root: {
    position: "flex",
    flexGrow: 1,
    margin: "0 auto",
    textAlign: "center",
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
          circle: classes.square,
        }}
        size={35}
        thickness={9}
        {...props}
      />
    </div>
  );
}

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <Grid is_flex column bg="transparent" justify="center" height="50vh" margin="400px auto 0 auto">
      <div className={classes.root}>
        <FacebookCircularProgress />
        <Text h3>조금만 기다려주세요!</Text>
      </div>
    </Grid>
  );
}

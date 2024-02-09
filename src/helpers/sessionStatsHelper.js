function durationArr(sessionData) {
  const durationArr = sessionData.map((session, i) => {
    // this is quite a bit more complicated
    // essentially based on datecut off I want the time included to be in a different format
    // if its week Monday-Sunday
    // if its a month Just the Days
    //if its a year then return the Month
    // What about 3 months? Maybe just return Months like year
    // then SessionStats can take care of ensuring that the graph changes accordingly
    const sessionDate = new Date(session.sessiondate);
    const monthDay = sessionDate.getMonth() + 1; // getMonth() returns a 0-based month, so add 1
    const date = sessionDate.getDate();
    durationEntry = { duration: session.duration };
  }, []);
}

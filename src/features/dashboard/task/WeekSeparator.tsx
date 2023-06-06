const WeekSeparator = () => {
  return (
    <div className="week-separator">
      <span className="week-separator__line"></span>
      <p className="week-separator__text">
        This week: <span className="week-separator__text--bold">00:34:33</span>
      </p>
      <span className="week-separator__line"></span>
    </div>
  );
};

export default WeekSeparator;

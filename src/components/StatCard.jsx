function StatCard({
  title,
  count
}) {
  return (
    <div className="stat-card">

      <h6 className="text" style={{fontFamily:"Arial, sans-serif", fontSize:"20px", color:"#46e5d8"}}>
        {title}
      </h6>

      <h1>
        {count}
      </h1>

    </div>
  );
}

export default StatCard;
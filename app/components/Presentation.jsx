function Presentation({title, content, img}) {
  return (
    <section className="pres">
      <div className="pres__content">
        <h1 className="pres__content--title">{title}</h1>
        <p>{content}</p>
      </div>
      <div className="pres__img">
        <img src={img} alt="" />
      </div>
    </section>
  );
}

export default Presentation;

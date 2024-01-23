import Actu from "../data/Actu.json"


function Grid(){
    return (
        <section className="gridActu">
            {Actu.map((item) => (
        <article className="grid" >
        <img src={item.src} alt="" className="grid__img" />
        <p className="grid__date">{item.date}</p>
        <h3 className="grid__title">{item.name}</h3>
        <p className="grid__desc">{item.desc}</p>
    </article>
        ))}
        </section>
    )
}

export default Grid;
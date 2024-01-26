import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardImgOverlay,
  CardText,
  CardTitle,
} from 'react-bootstrap';
import Actu from '../data/Actu.json';

function Grid() {
  return (
    <section>
      <div className="grid">
        {Actu.map((item) => (
          <Card>
            <CardImg src={item.src} />
            <CardBody>
              <CardText className="grid__date small">{item.date}</CardText>
              <CardTitle>{item.name}</CardTitle>
            </CardBody>
          </Card>
          //     <article className="card" >
          //     <img src={item.src} alt="" className="grid__img" />
          //     <p className="grid__date">{item.date}</p>
          //     <h3 className="grid__title">{item.name}</h3>
          //     <p className="grid__desc">{item.desc}</p>
          // </article>
        ))}
      </div>
      <div className="grid__btn">
        <Button>VOIR TOUT</Button>
      </div>
    </section>
  );
}

export default Grid;

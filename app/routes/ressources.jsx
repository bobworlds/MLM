import Grid from '~/components/Grid';
import Presentation from '~/components/Presentation';
import Ban from '../images/photo-test.jpg';

function Ressources() {
  return (
    <section class="ressources">
      <Presentation
        title="MERCI L'ACTU"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse rerum numquam iste iusto, necessitatibus dolorum fuga autem ut cumque nisi vitae atque repudiandae deserunt dolores voluptatum, sed, doloribus excepturi reiciendis?"
        img={Ban}
      />
      <Grid />
    </section>
  );
}

export default Ressources;

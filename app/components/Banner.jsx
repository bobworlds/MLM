import { RxArrowLeft, RxArrowRight, RxArrowTopRight } from "react-icons/rx";
import Banner1 from "../images/banner.png"
import Banner2 from "../images/mockuptee.png"

function Banner() {
    return (
        <section className="banner">
            <div className="banner__container">
                <div className="banner__img one"></div>
                    <div className="banner__btn">
                    <button>Commencer 
                        <RxArrowTopRight />
                    </button>
                </div>
            </div>
            <div className="banner__container">
                <div className="banner__img two"></div>
                    <div className="banner__btn">
                    <button>Découvrir 
                        <RxArrowTopRight />
                    </button>
                </div>
            </div>

        </section>
    )
}

export default Banner;
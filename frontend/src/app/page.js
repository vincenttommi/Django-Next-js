import HomeBanners from "./components/HomeBanner";
import HomeGallery from "./components/HomeGallery";
import HomeReviews from "./components/HomeReviews";
import HomeServices from "./components/HomeServices";




export default function Home(){
    return(
        <main>
            <HomeBanners />
            <HomeServices />
            <HomeGallery />
            <HomeReviews />
        </main>
    )
}
import React from "react";
import CategoriesNavbar from '../components/categoriesNavbar'
import HeroSection from "../components/heroSection";
import Products from '../components/products';

function Home() {
    return (
        <>
            <div >
                <CategoriesNavbar />
                <HeroSection />
                <Products />
            </div>
        </>
        )
}
export default Home;
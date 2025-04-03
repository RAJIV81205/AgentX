import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Built from "../components/Built"
import About from "../components/About"
import Contact from "../components/Contact"
import Features from "../components/Features"
import Footer from "../components/Footer"

function LandingPage(){
    return(
        <>
        <Navbar />
        <Hero />
        <Built />
        <About />
        <Features />
        <Contact />
        <Footer />
        </>
    )
}

export default LandingPage
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Built from "../components/Built"
import About from "../components/About"
import Contact from "../components/Contact"
import Features from "../components/Features"

function LandingPage(){
    return(
        <>
        <Navbar />
        <Hero />
        <Built />
        <About />
        <Features />
        <Contact />
        </>
    )
}

export default LandingPage
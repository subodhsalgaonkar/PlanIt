import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import reactLogo from "../assets/react.svg";

const LandingPage = () => {
  useEffect(() => {
    // Remove the height and overflow restrictions to allow scrolling
    document.documentElement.style.height = "auto";
    document.body.style.height = "auto";
    document.documentElement.style.overflow = "auto";

    // Reset the isLoggedIn flag
    localStorage.setItem("isLoggedIn", "false");
  }, []);

  return (
    <div className="relative min-h-screen w-screen">
      {/* header starts here */}
      <div className="flex justify-end p-3 shadow-md sticky top-0 bg-white z-20">
        <Link
          to="/login"
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="mx-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Sign Up
        </Link>
      </div>
      {/* header ends here */}

      <div className="fixed w-screen h-screen bg-gradient-to-r from-green-400 to-blue-500 z-0 flex  items-center">
        <div className="w-3/6">
          <img
            src={reactLogo}
            alt="app image"
            className=" fixed pl-4 left-2 top-20 h-5/6 opacity-30"
          />
        </div>
        <h1 className="text-9xl font-bold font-sans text-white">
          Plan It
          <br />
          Conquer It
        </h1>
      </div>
      <div className="relative z-10 mt-[100vh] p-8 bg-white">
        <h1 className="text-4xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            Hello world !!! Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Modi, ducimus quod cupiditate consequatur corrupti laudantium
            praesentium! Voluptate sunt a, pariatur officia, possimus sit
            tempore quasi facere error, vel excepturi incidunt. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Repudiandae sequi
            perferendis velit beatae voluptatum minima accusantium natus
            accusamus eveniet, voluptatibus veniam dolores aliquam consectetur
            recusandae a molestiae minus inventore? Esse. Repellat, saepe! Esse
            ab, vero accusamus labore excepturi veniam ut alias dolor quae
            fugiat doloremque eligendi rerum, unde inventore perferendis sequi,
            architecto explicabo. Facilis dolore, voluptatum modi deserunt quis
            molestias. Sint voluptatibus beatae et reiciendis odio aliquid, nam
            non doloremque quis nesciunt nemo facere dignissimos, exercitationem
            amet necessitatibus molestiae suscipit quidem nihil mollitia
            pariatur earum, aspernatur quam. Necessitatibus, consequuntur rem?
            Asperiores quos, itaque atque perferendis eaque porro, magni iusto,
            quasi eius inventore esse. Dolores minima, ipsa consequatur alias
            ipsam facilis, eius soluta aspernatur expedita, tempora in totam
            iste quia accusamus. Minima consequatur excepturi dolore delectus
            laborum, ratione cum maxime officiis earum fuga consectetur, ipsam
            ab itaque temporibus. Vel voluptatibus, amet dignissimos, doloremque
            illum repellendus ipsam mollitia quod quae et aut?
            <br />
            <br />
            end this section
            <br />
            add a footer name and creator
          </span>
        </h1>
      </div>
    </div>
  );
};

export default LandingPage;

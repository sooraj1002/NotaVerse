import background from "/background1.jpg";

const LandingPage = () => {
  return (
    <>
      <div
        className="min-h-[93vh] bg-cover bg-center flex flex-col justify-center items-center"
        style={{ backgroundImage: `url(${background}` }}
      >
        <div className="md:text-7xl">Welcome to NotaVerse</div>
        <p className=" text-xl py-3">One Stop Solution for all your notes!</p>
        <div className="py-6 flex justify-evenly w-[80%]">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full">
            <a href="/login">Login</a>
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full">
            <a href="/signup">Sinup</a>
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

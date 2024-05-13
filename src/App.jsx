import { useState, useEffect } from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import MainContent from "./components/MainContent";
import { CiSearch } from "react-icons/ci";

function App() {
    const [audioError, setAudioError] = useState(false);
    const [font, setFont] = useState("Serif");
    const fontData = {
        Serif: "Serif",
        "Sans-serif": "Sans",
        Monospace: "Mono",
    };

    const [darkMode, setDarkMode] = useState(false);
    const [wordSearched, setWordSearched] = useState("");
    const [obj, setObj] = useState(null);
    const [audio, setAudio] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setAudio(() => {
            if (obj?.phonetics.length > 0) {
                const src = "" || obj.phonetics.find((obj) => obj.audio)?.audio;
                return new Audio(src);
            }
        });
    }, [obj]);

    useEffect(() => {
        if (wordSearched) {
            setLoading(true);
            fetch(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${wordSearched}`,
            )
                .then((res) => res.json())
                .then((data) => {
                    setObj(data[0]);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [wordSearched]);

    function handleSubmit(e) {
        e.preventDefault();
        const inputWord = e.target.word.value.trim().toLowerCase();
        if (inputWord) {
            setWordSearched(inputWord);
            e.target.reset();
        }
    }

    useEffect(() => {
        if (audioError) {
            setTimeout(() => {
                setAudioError(false);
            }, 3000);
        }
    }, [audioError]);

    const mainContent = obj && (
        <MainContent {...obj} audio={audio} setAudioError={setAudioError} />
    );

    return (
        <div
            className={`min-h-screen w-full overflow-hidden text-base transition-colors md:py-2 dark:bg-zinc-950 dark:text-white ${darkMode && "dark"}`}
            style={{ fontFamily: font }}
        >
            <main className="break-word relative mx-auto min-h-screen max-w-[500px] px-3 py-4">
                <div
                    className={`absolute transition-all duration-300  ${audioError ? "right-4 top-4 opacity-100 z-10" : "right-0 top-4 opacity-0 -z-10"} rounded-md border-b-4 border-red-400 bg-blue-50 px-4 py-2`}
                >
                    <p className="cursor-pointer font-sans font-semibold">
                        Audio is currently unavailable
                    </p>
                </div>
                <Header setDarkMode={setDarkMode}>
                    <Menu value={font} setValue={setFont} data={fontData} />
                </Header>
                <h1 className="mt-4 text-center text-3xl font-bold uppercase">
                    Dictionary
                </h1>
                <form onSubmit={handleSubmit} action="#" className="mt-4">
                    <div className="mx-2 flex items-center gap-4 rounded-full bg-zinc-100 px-4 py-2 transition-colors dark:bg-zinc-800">
                        <input
                            placeholder="Search here"
                            type="text"
                            name="word"
                            className="grow bg-inherit text-base font-semibold outline-none"
                            autoComplete="off"
                        />
                        <button type="submit">
                            <CiSearch className="size-6 fill-[#a740f8] transition-transform hover:scale-110" />
                        </button>
                    </div>
                </form>
                {loading ? (
                    <p className="mt-8 text-center text-xl">Loading...</p>
                ) : mainContent === undefined ? (
                    <p className="mt-8 text-center text-xl">
                        Oops... No Data Found!
                    </p>
                ) : (
                    mainContent
                )}
            </main>
        </div>
    );
}

export default App;

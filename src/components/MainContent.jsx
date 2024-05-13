import { BsDot } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { FaPlay } from "react-icons/fa6";

function MainContent({
    word,
    phonetics,
    meanings,
    sourceUrls,
    audio,
    setAudioError,
}) {
    return (
        <div className="mt-8 px-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">{word}</h1>
                    <h4 className="mt-2 text-[#a740f8]">
                        {phonetics.length > 0 &&
                            phonetics.find((obj) => {
                                return obj.text;
                            })?.text}
                    </h4>
                </div>
                <div>
                    {audio?.src && (
                        <div
                            onClick={() => {
                                audio
                                    .play()
                                    .then(() => {
                                        console.log("Playing audio");
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        setAudioError(true);
                                    });
                            }}
                            className="group flex size-14 cursor-pointer items-center justify-center rounded-full bg-purple-300 shadow-lg"
                        >
                            <FaPlay className="ml-1 size-6 fill-[#a740f8] transition-transform group-hover:scale-125" />
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-8">
                {meanings.map((meaning) => {
                    return (
                        <div className="mt-6">
                            <div className="flex items-center gap-2">
                                <p className="font-semibold">
                                    {meaning.partOfSpeech}
                                </p>
                                <div className="h-0 grow border transition-colors dark:border-gray-700"></div>
                            </div>
                            <div className="mt-5">
                                <h3 className="text-zinc-400">Meaning</h3>
                                <ul className="mt-4">
                                    {meaning.definitions.map(
                                        ({ definition, example }) => (
                                            <li className="mt-2 flex items-start gap-2">
                                                <BsDot className="size-6 shrink-0 fill-[#a941fb]" />
                                                <div>
                                                    <p>{definition}</p>
                                                    <p className="mt-2 text-zinc-500">
                                                        {example}
                                                    </p>
                                                </div>
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            {meaning.synonyms.length > 0 && (
                                <div className="mt-6">
                                    <div className="flex items-start gap-4">
                                        <h3 className="shrink-0 text-zinc-400">
                                            Synonyms
                                        </h3>
                                        <p className="font-semibold text-[#a740f8]">
                                            {meaning.synonyms.join(", ")}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {meaning.antonyms.length > 0 && (
                                <div className="mt-6">
                                    <div className="flex items-start gap-4">
                                        <h3 className="shrink-0 text-zinc-400">
                                            Antonyms
                                        </h3>
                                        <p className="font-semibold text-[#a740f8]">
                                            {meaning.antonyms.join(", ")}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            {sourceUrls.length > 0 && (
                <div className="my-8 border-t-2 transition-colors dark:border-gray-700">
                    <div className="mt-6">
                        <h3 className="text-zinc-400">Source</h3>
                        <a
                            className="mt-2 block w-fit text-slate-700 underline transition-colors hover:text-black dark:text-slate-200 dark:hover:text-slate-100"
                            href={sourceUrls[0]}
                            target="_blank"
                        >
                            {
                                <div className="flex items-center gap-2">
                                    <p className="break-all">{sourceUrls[0]}</p>
                                    <FiExternalLink className="shrink-0" />
                                </div>
                            }
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MainContent;

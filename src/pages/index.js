"use client";
import Image from "next/image";
import { Bigelow_Rules } from "next/font/google";
import { useEffect, useState } from "react";
import Head from "next/head";

const BigelowRules = Bigelow_Rules({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const [state, setState] = useState({ monsters: [], searchField: "" });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setState((prev) => ({ ...prev, monsters: users })));
  }, []);

  function onSearchChange(e) {
    setState((prev) => {
      return {
        ...prev,
        searchField: e.target.value.toLowerCase(),
      };
    });
  }

  const filteredMonsters = state.monsters.filter((monster) => {
    return monster.name.toLowerCase().includes(state.searchField);
  });

  return (
    <div>
      <Head>
        <title>Monster Rolodex</title>
      </Head>
      <main className="flex justify-center items-center flex-col ">
        <h1
          className={`text-teal-400 text-[76px] mb-11 mt-12 font-bold ${BigelowRules.className} text-center`}
        >
          Monsters Rolodex
        </h1>

        <input
          className="border-none leading-[30px] mb-[30px] outline-none p-[10px] w-[150px] rounded-md text-center"
          type="search"
          id="search"
          name="search"
          placeholder="search monsters"
          value={state.searchField}
          onChange={onSearchChange}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-0 mx-auto w-[85vw] text-center gap-5 card">
          {filteredMonsters.map((monster) => (
            <div
              className="bg-[#95dada] border-[1px] border-solid border-gray-800 rounded-md cursor-pointer flex flex-col p-[25px] backface-hidden transform duration-500 hover:scale-110  hover:ease-out hover:antialiased"
              key={monster.id}
            >
              <Image
                src={`https://robohash.org/${monster.id}?set=set2&`}
                width={180}
                height={180}
                alt="monster"
                className="cursor-pointer w-auto"
              />
              <h2 className="block text-[1.5em] ms-0 me-0 font-bold  ">
                {monster.name}
              </h2>
              <p className="block ms-0 me-0 break-words">{monster.email}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

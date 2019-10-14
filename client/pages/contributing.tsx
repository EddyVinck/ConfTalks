import React, { useState } from "react";
import Head from "next/head";
import Nav from "../components/nav";

const Contributing = () => {
  return (
    <div>
      <Head>
        <title>Contributing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <div className="hero">
        <h1>Contributing to ConfTalks</h1>
        <p className="description">
          Do you ever look at conference programs and think: "I wish I could go,
          but I can't" or "only a few of these talks interest me, is this really
          worth my time?". ConfTalks is an open source attempt to solve this
          problem for free, by creating an index of conference talks that are
          already recorded and uploaded somewhere. You can bookmark talks so you
          can check up on them later to see if they have been uploaded already.
        </p>
      </div>
    </div>
  );
};

export default Contributing;

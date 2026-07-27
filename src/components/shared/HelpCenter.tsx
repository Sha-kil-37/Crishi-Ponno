"use-client";
import { motion } from "framer-motion";
//
import React from "react";

export default function HelpCenter() {
  //
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 8,
      }}
      transition={{
        duration: 0.2,
      }}
      className="absolute left-0 top-full  w-full bg-gray-200"
    >
      <div className="w-7xl mx-auto">
        <h2 className="text-center">Help Center</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet fuga
          aliquam impedit enim corporis nisi cupiditate quis laboriosam
          inventore possimus vel hic, reprehenderit, accusamus veritatis
          delectus deserunt, iure quisquam ab dolorum facilis. Esse deleniti
          magni ut excepturi amet, uptate, iste quisquam officia alias officiis
          ipres. Officia ipsam eum harum error veritatis, velit esse tempore
          possimus sit officiis, rem odio quaerat amet tempora cupiditate
          molestiae itaque nisi! Ex ipsum magnam, ipsam reiciendis iste earum
          laudantium! Tempore, id asperiores. Assumenda mollitia distinctio cum
          sit itaque deserunt officiis excepturi nihil incidunt maiores dolor
          magni ex nemo aliquid esse doloribus omnis, labore velit hic eos,
          totam blanditiis! Aliquid hic ex dolorum iste dolore ea cumque.
          Eveniet voluptatem laborum nam in porro possimus iusto consequuntur
          aspernatur ducimus quo amet distinctio eum, ut nulla tenetur fugiat
          corrupti aliquam! Ratione qui expedita cupiditate deleniti blanditiis
          corrupti tempora deserunt! Id maxime magni maiores voluptatum possimus
          tempora minus minima in?
        </p>
      </div>
    </motion.div>
  );
}

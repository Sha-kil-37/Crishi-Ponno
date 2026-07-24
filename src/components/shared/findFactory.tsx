import { motion } from "framer-motion";

export default function FindFactory() {
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
      className="absolute left-0 top-full w-full bg-white"
    >
      <div className="mx-auto w-7xl">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil,
        voluptate quisquam dolores voluptatem quis fugiat molestias explicabo
        facilis aliquam inventore ut. Dolor odio consequatur temporibus!
        Distinctio voluptatibus voluptatum suscipit asperiores soluta?
        Perspiciatis eveniet vel soluta eaque illum dolorem perferendis
        cupiditate!
      </div>
    </motion.div>
  );
}

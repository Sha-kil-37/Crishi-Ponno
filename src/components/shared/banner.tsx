"use client";
import { RefObject } from "react";
import SearchBox from "./searchBox";

interface BannerProps {
  bannerRef: RefObject<HTMLElement | null>;
  showNavboxSearch: boolean;
}
//
export default function Banner({ bannerRef, showNavboxSearch }: BannerProps) {
  //
  return (
    <section ref={bannerRef} className="xl:w-7xl mx-auto py-10">
      <div >
        {!showNavboxSearch && <SearchBox />}
      </div>

      <h2>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis pariatur
        deserunt, non sequi vel sed doloribus eum autem illum magnam
        necessitatibus fugit dolore, nemo ea ad. Saepe quae, itaque quo beatae
        ipsum molestias, ipsa quidem aliquid, voluptas reiciendis eos aliquam
        magnam illum numquam blanditiis! Quidem reiciendis officia doloremque
        distinctio sit sed minima, molestiae commodi voluptatum aut quibusdam
        dignissimos quisquam totam provident nam! In sunt, voluptatibus
        distinctio nesciunt eos et, itaque corporis praesentium expedita
        doloribus cum sint voluptates nihil. Iste repellat totam quas sint odio
        corporis porro natus illum fuga ipsa repellendus ullam in vel saepe
        inventore perspiciatis autem, asperiores, adipisci nobis quo?
        Consequatur quae explicabo est non. Quaerat, nisi, incidunt eveniet fuga
        labore perspiciatis eos unde hic quas quia facilis omnis explicabo magni
        illo cupiditate architecto eaque quibusdam! Eaque voluptate corrupti
        commodi dolor velit odio dolore et. Corrupti aspernatur ad molestiae
        dicta iste, repudiandae, quo optio, quia recusandae voluptate
        necessitatibus nesciunt saepe? Aperiam numquam assumenda nihil
        perspiciatis nostrum aspernatur, quaerat eum blanditiis ut vero mollitia
        consequuntur iure porro ullam aliquid fuga laboriosam omnis ad cumque
        error temporibus facilis eius corrupti harum. Accusamus, laboriosam!
        Vitae maiores, exercitationem repudiandae quis molestias ratione autem
        officiis! Nihil veritatis fugiat, cupiditate dolorum architecto,
        voluptates quos impedit eum error illum doloribus ab corporis sit
        mollitia molestias ipsum, veniam dolores nulla quas? Quidem voluptate,
        quibusdam perspiciatis neque aliquam vitae qui est hic optio officia
        culpa cum ipsum facilis sed beatae perferendis eligendi temporibus
        commodi suscipit maiores. Iste ratione rerum at doloribus eos labore
        cum, voluptas quo odit blanditiis animi itaque nemo perspiciatis
        nesciunt enim possimus optio! Quibusdam impedit enim repudiandae ipsum
        officiis perspiciatis ab sit assumenda, dolores nemo totam expedita
        harum eum, repellendus facere voluptatem magnam nobis voluptatum animi
        deleniti! Nisi dolore illum quaerat fugit facere dolorem sequi quisquam
        impedit est nemo, libero molestias? Repudiandae consequatur aliquid
        explicabo voluptas excepturi similique consequuntur est corrupti
        obcaecati harum! Perspiciatis ullam blanditiis asperiores nobis eius
        deleniti beatae nihil dolorem qui sunt? Minus minima illo laudantium, ab
        ex aliquid error ducimus aliquam labore, incidunt aspernatur ea
        distinctio. Magni neque perferendis assumenda similique nam repellendus
        minima earum voluptates enim error minus et, laborum recusandae, debitis
        cumque numquam aperiam modi praesentium! Similique cum recusandae facere
        quis voluptatum alias ab totam harum laudantium magnam sed eum officiis
        dolore consequatur minima repellendus, illo temporibus rerum facilis
        commodi placeat deserunt. Quos dolores perferendis eius tempora sint
        maxime ipsa eum incidunt modi atque laboriosam labore laborum dolor,
        soluta ea iure omnis culpa quo sit, quisquam obcaecati? Quod placeat
        porro animi minima beatae dignissimos libero accusamus sapiente quo
        soluta ea expedita, provident ipsa, dicta modi nihil aspernatur ex?
        Voluptatem totam, expedita esse, dignissimos labore illo mollitia
        quaerat quisquam voluptas voluptate a fugiat nulla dolorem asperiores
        repudiandae eum eos cum itaque nisi tenetur facilis, autem cumque?
        Dolore neque molestias odit asperiores suscipit beatae modi dignissimos
        quae tempore, in laudantium blanditiis id tenetur commodi minima ea
        autem magnam, sit assumenda fugit quod consectetur facilis expedita.
        Veritatis, adipisci obcaecati culpa asperiores repellendus sint earum
        hic nobis, maiores omnis voluptas ea. Dolores?
      </h2>
    </section>
  );
}

"use client";
//
import Header from "@/components/layout/admin/Header";
import Sidebar from "@/components/layout/admin/Sidebar";
import Dialog from "@/components/utils/dialog";
import ReduxProvider from "@/components/utils/providers/ReduxProvider";
import { DialogProvider } from "@/hooks/client/useDialog";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

//
function Page() {
  //
  return (
    <>
      <ReduxProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <DialogProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="min-w-0">
                <Header />
                <h2>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Facere dolorum ut qui nulla maxime ex provident quod quidem
                  quas ducimus, accusantium, reiciendis ea, possimus facilis
                  eius enim neque vero quo sapiente numquam in praesentium!
                  Animi, itaque nulla provident veritatis modi libero aliquam
                  excepturi deserunt, molestias ipsam, enim vitae reprehenderit
                  nesciunt. Beatae, quos perspiciatis unde necessitatibus
                  aperiam exercitationem suscipit delectus minima repudiandae
                  enim maxime ducimus quis tempora corrupti odio reprehenderit
                  rem, illum minus. Numquam earum doloribus sint perferendis
                  blanditiis, dolores ipsum tempora quia fuga harum, corporis
                  modi voluptate assumenda! Nulla nisi quos, consectetur magni
                  facere ratione aliquid debitis eius quasi error fuga quod
                  doloribus repudiandae ipsa a commodi laborum sed? Reiciendis
                  doloremque incidunt provident quisquam dolore atque sequi
                  commodi suscipit delectus voluptatibus nulla ab dolores totam
                  saepe exercitationem adipisci consequuntur non voluptatum rem,
                  enim veritatis natus. Sint asperiores quod magnam illo maiores
                  atque? Suscipit perferendis inventore maxime quisquam ipsam
                  saepe impedit quidem, animi at, quis autem, velit culpa sit
                  facere consequatur officia quia! Iste voluptatem maiores
                  impedit sunt recusandae natus cupiditate facilis repellendus
                  mollitia, earum omnis assumenda illo vel at voluptatum rem
                  non! Minus rerum ea in voluptas asperiores, pariatur culpa
                  molestiae consectetur adipisci minima aliquid debitis quisquam
                  ex neque autem. Animi dignissimos assumenda fuga possimus.
                  Eius, qui. Ut molestias nostrum, inventore facilis dolores
                  distinctio optio velit porro repudiandae veritatis ad quidem
                  laudantium non nulla placeat tempora labore corrupti quibusdam
                  omnis. Iure, in et magnam esse itaque dolor. Ratione ex
                  veritatis laborum aut, laudantium deserunt eum impedit optio
                  architecto nisi at similique odit unde autem sunt cumque eos
                  labore id praesentium illo, quaerat enim iure distinctio
                  maxime? Necessitatibus esse quasi maiores in aperiam
                  cupiditate. Laborum saepe iusto alias deleniti optio rerum
                  impedit inventore dolore, amet sed aliquid iure eaque repellat
                  quidem reiciendis rem voluptate enim dicta ratione adipisci
                  blanditiis dolorum magni.
                </h2>
              </main>
            </div>
            <Dialog />
            <Toaster position="top-right" richColors />
          </DialogProvider>
        </ThemeProvider>
      </ReduxProvider>
    </>
  );
}

export default Page;

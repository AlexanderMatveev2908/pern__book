import { FC, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatchType, RootStateType } from "../../../store/store";
import { setIsSideOpen } from "../Header/headerSlice";
import UserEmail from "./components/UserEmail";

const Sidebar: FC = () => {
  const sideRef = useRef<HTMLDivElement | null>(null);

  const dispatch: AppDispatchType = useDispatch();
  const isSideOpen = useSelector(
    (state: RootStateType) => state.sidebar.isSideOpen
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sideRef.current && !sideRef.current.contains(e.target as Node))
        dispatch(setIsSideOpen(false));
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  return (
    <>
      <div
        className={`w-full z__sidebar_bg inset-0 bg-black/50 ${
          isSideOpen ? "fixed" : "hidden"
        }`}
      ></div>
      <div
        ref={sideRef}
        className={`fixed top-[80px] bottom-0 right-0 w-[500px] bg-[#000]  border-l-[3px] border-blue-600 transition-all duration-500 z__sidebar text-white overflow-y-auto scrollbar__y scrollbar__app ${
          isSideOpen ? "opacity-100" : "opacity-0 translate-x-full"
        } `}
      >
        <div className="max-w-full relative grid gap-4">
          <UserEmail {...{ email: "JohnDoe@gmail.com" }} />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            ipsum qui est labore delectus! Voluptatum, fugit. Perferendis eaque
            voluptatem illum, debitis animi molestias, labore et error enim
            atque impedit expedita. Pariatur assumenda totam quibusdam aliquam.
            Fuga, laudantium dolor nihil voluptate repellendus maxime veniam
            aperiam dicta magnam earum est perferendis hic consequuntur corrupti
            dignissimos laboriosam soluta ad officia, veritatis, molestias amet.
            Aut quis quam amet. Accusamus, laboriosam iure ipsum quasi nihil
            doloremque? Earum quam ab, rem dolor inventore et excepturi beatae.
            Voluptas architecto saepe excepturi odio iusto ullam non aliquam
            facilis. Quam illum nihil tenetur? Magnam, alias laudantium numquam
            laboriosam sapiente aut consequuntur iste necessitatibus? Sunt
            dolore aspernatur cum numquam dicta, laborum vero soluta magni
            accusamus mollitia odit ipsum minus? Excepturi. Cumque veritatis
            consequuntur fuga nisi quidem necessitatibus fugit. Natus doloremque
            alias facilis autem id sunt accusamus quidem quod expedita rem
            porro, voluptatem assumenda officia repellendus, temporibus,
            deserunt asperiores a ex. Nobis corporis, quae neque maiores soluta
            alias quos tempore vero officia mollitia aut ea quas repellat harum
            explicabo, minima recusandae minus ipsam quis deleniti qui quibusdam
            doloribus atque nihil. Debitis! Debitis aut temporibus cum?
            Recusandae inventore laudantium eligendi laborum magnam vitae error
            tempore earum? Odio repellendus, excepturi neque debitis, ullam
            corrupti, tempora libero aliquam perferendis ad quos? Consectetur,
            illo voluptates. Magni cupiditate doloremque sed quidem impedit
            corrupti explicabo veniam nihil harum consequatur placeat distinctio
            quas, inventore id ab rerum facilis recusandae amet deserunt totam
            quaerat accusamus. Laboriosam iste voluptates quaerat. Cumque
            doloremque iusto corrupti aliquid in neque doloribus ullam quia,
            odit ab culpa accusantium aspernatur maxime sapiente dolorum amet
            est a vitae. Velit quia aperiam omnis autem nostrum, facilis
            voluptates! Officiis expedita omnis, voluptatibus nesciunt officia
            nulla laudantium. Quo corporis libero praesentium doloribus eius
            similique accusamus perspiciatis tenetur, cumque reprehenderit natus
            culpa quibusdam nisi, maiores sint facere soluta? Perferendis,
            provident? Amet minus ex odio omnis totam quidem. Minus fuga nobis,
            saepe reiciendis optio repellendus unde, error omnis quaerat
            repellat placeat nisi doloribus! Veniam repellat eaque minima
            obcaecati voluptatibus molestiae rerum. Eaque, animi!
            Necessitatibus, omnis blanditiis quae veritatis molestiae, animi
            iusto ea commodi quo a sunt perferendis repellendus neque facilis?
            Labore laboriosam nobis officia assumenda perspiciatis quasi
            provident possimus laborum vero. Id illo accusamus iusto provident
            nostrum accusantium ducimus facere sit quisquam repellendus magni,
            voluptas quod recusandae aperiam cumque eligendi excepturi ipsam
            repellat deleniti eaque sint! Eius deserunt reprehenderit magni
            aspernatur! Commodi ut quis deserunt, est architecto ratione qui
            ipsam animi minima magnam explicabo totam ab ullam accusantium
            itaque eveniet quod nemo quidem, quo possimus unde libero voluptas
            veritatis natus. Laudantium? Rem fugit facere quibusdam neque
            necessitatibus esse modi est, iusto sit voluptatum illum quos ex
            praesentium saepe ipsa quis eveniet, quaerat qui? Tenetur debitis,
            doloremque accusantium voluptatibus voluptates ex illo! Sunt nam
            voluptatem ex voluptatibus hic quaerat, quo minima exercitationem
            dolore nihil veniam id velit quis eos tempore, provident aut iure.
            Nisi est assumenda inventore obcaecati itaque illum, adipisci quasi!
            Iusto, maxime dignissimos. Repudiandae a error deserunt quo
            laboriosam excepturi nobis ipsa modi doloremque saepe, voluptates
            ratione fugiat architecto dignissimos dolore iure commodi quaerat.
            Itaque possimus magnam sed qui similique. Delectus neque amet ab in
            est aliquam. Illum qui, cupiditate quas in aliquam ipsa voluptatibus
            impedit quis distinctio repellendus sequi asperiores animi tempora
            vel ad molestias minus voluptas fuga dolore. Repudiandae perferendis
            blanditiis eaque repellendus obcaecati earum fuga provident aliquam,
            ipsa laborum inventore veritatis enim assumenda! Quidem repellendus
            dolorem provident numquam impedit tenetur mollitia ullam? Possimus
            qui earum aperiam autem. Consequuntur nulla distinctio quam
            voluptates cumque quia, ab assumenda non est reprehenderit repellat
            in consequatur mollitia earum aliquam eligendi ad deleniti quaerat
            quae molestias, maxime harum iusto? Illo, assumenda minus. Placeat
            voluptatem, eius, eveniet voluptate nemo, aperiam nam perferendis
            numquam omnis quaerat temporibus. Autem at ratione totam animi? Quod
            aliquid vel magnam sequi maxime culpa tempora, cupiditate excepturi
            dolores nihil. Culpa maxime accusantium quas quam natus voluptate
            odit provident assumenda. Animi accusantium fugiat distinctio ullam
            voluptatum cum quam voluptatem praesentium, maxime facere aut
            dolorem eaque provident labore beatae earum fuga. Laborum officiis
            odio ad deserunt perferendis dignissimos eos, blanditiis beatae et,
            enim sint laboriosam iste nulla? Iure quod corrupti enim aperiam
            natus fugiat eaque, quas reiciendis accusantium, incidunt eum quam.
            Velit, animi? Accusantium quisquam unde quibusdam corrupti impedit
            ea consectetur nihil quas, non voluptatem delectus omnis
            perspiciatis ex nam harum quasi nulla voluptatibus illum nesciunt!
            Reprehenderit tempore ipsum nihil delectus. Neque odio, molestias
            repellat officiis dolorem, aut, incidunt reprehenderit ad dolorum
            ipsa repellendus perferendis dignissimos nostrum ab. Facere vero cum
            molestiae explicabo, commodi eveniet nostrum amet eos, totam quae
            quibusdam? Ut, architecto, veniam rerum quasi assumenda, quam
            expedita doloribus iusto provident similique aut aliquam id. Ex,
            quos. Impedit dolores adipisci alias! Et, nemo quam necessitatibus
            suscipit est exercitationem veritatis tempore. Suscipit commodi modi
            quas harum doloremque tenetur unde neque exercitationem, adipisci
            aliquam deleniti, nisi minima enim dicta iste ratione molestias
            aspernatur cumque voluptates, voluptatum itaque error incidunt
            quasi! Ducimus, consequatur. Qui laboriosam exercitationem accusamus
            perferendis dolore et officiis, reprehenderit error minima optio
            illo nam rem soluta, repellat nostrum aspernatur eos deleniti? Sed,
            odit magnam provident minima consectetur laudantium architecto
            reprehenderit. Consequuntur velit eum quo voluptates dolor.
            Exercitationem illo atque alias? Blanditiis enim inventore saepe,
            magni quia error asperiores doloribus? Non, dolore beatae!
            Architecto ut iure impedit sequi quia reiciendis aperiam. Qui,
            similique soluta tenetur quas aperiam labore voluptatibus possimus
            vitae quaerat autem praesentium dolore laboriosam est facilis minima
            distinctio. Neque voluptatem, cupiditate expedita quam optio
            voluptatibus voluptates tempore sapiente iste? Earum molestias ex
            quasi quaerat, recusandae a aspernatur repudiandae iusto voluptatum
            voluptatem deserunt nobis eum voluptas obcaecati voluptatibus,
            nostrum inventore modi ducimus sint minus illo veniam dicta eaque?
            Quis, ad. Vero itaque, at amet modi saepe voluptates asperiores ipsa
            consequuntur? Quis at, nulla explicabo beatae dicta accusantium
            dolores praesentium consequuntur odio obcaecati autem mollitia dolor
            qui ex doloremque numquam recusandae. Quibusdam nobis excepturi
            facilis laborum minus optio, doloribus deleniti corrupti alias ad
            error voluptates repellendus sit deserunt beatae fugit sapiente
            veritatis suscipit delectus consequuntur in? Deserunt esse nisi
            deleniti dolorum. Nihil ex numquam sapiente deleniti nostrum, eaque
            sed itaque! Cupiditate repellendus laborum doloremque, temporibus
            corporis cumque doloribus quis veniam, excepturi ipsa eligendi,
            consequuntur recusandae quaerat perferendis sit ratione dicta nulla!
            Laborum provident praesentium reprehenderit eaque iste aliquam
            consectetur repellendus ullam unde, ad, possimus, corporis iusto
            repudiandae beatae excepturi in et deserunt vel. Magnam delectus
            tur. Eum nulla velit, error aperiam, asperiores repudiandae
            necessitatibus perspiciatis ut accusamus sunt cumque fugit. Nobis
            obcaecati architecto maiores facere quidem! Debitis non voluptate
            natus quas iure odit asperiores repellat nostrum.
          </p>
        </div>
      </div>
    </>
  );
};
export default Sidebar;

import { IMenu } from "@/app/types";
import { setCookies, getCookies } from "@/lib/server-cookie";
import { BASE_API_URL, BASE_IMAGE_MENU, BASE_IMAGE_PROFILE } from "@/global";
import { get } from "@/lib/api-bridge";
import { AlertInfo } from "@/components/alert";
import Image from "next/image";
import Search from "./search";
import { QuantityCounter, Cart } from "./cart";
import Filter from "@/components/filteringMenu";

const getMenu = async (search: string): Promise<IMenu[]> => {
  try {
    const TOKEN = await getCookies("token");
    const url = `${BASE_API_URL}/menu/get?search=${search}`;
    const { data } = await get(url, TOKEN);
    let result: IMenu[] = [];
    if (data?.status) result = [...data.data];
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const filterMenu = async (category: string): Promise<IMenu[]> => {
  try {
    const TOKEN = await getCookies("token");
    const url = `${BASE_API_URL}/menu/filter?category=${category}`;
    const { data } = await get(url, TOKEN);
    let result: IMenu[] = [];
    if (data?.status) result = [...data.data];
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const OrderPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const search = await (searchParams.search
    ? searchParams.search.toString()
    : ``);

  const filterQuery = await (searchParams.category
    ? searchParams.category.toString()
    : ``);

  const menu: IMenu[] = filterQuery
    ? await filterMenu(filterQuery)
    : await getMenu(search);

  const category = (cat: string): React.ReactNode => {
    if (cat === "FOOD") {
      return (
        <span className="bg-blue-100 text-red-800 text-md font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
          Food
        </span>
      );
    }
    if (cat === "SNACK") {
      return (
        <span className="bg-indigo-100 text-indigo-800 text-md font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
          Snack
        </span>
      );
    }
    return (
      <span className="bg-green-500 text-green-800 text-md font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
        Drink
      </span>
    );
  };

  return (
    <div className="main-background flex min-h-screen p-2 gap-2">
      <div className=" w-3/4 py-4 px-2 border-t-4 bg-white shadow-xl border-orange-400 rounded-lg">
        <h1 className="text-xl font-bold mb-2">Menu Data</h1>
        <p className="text-sm text-secondary mb-4">
          Halaman ini menampilkan data menu, untuk menambahkan jumlah orderan.
        </p>
        <div className="flex justify-between items-center mb-9">
          {/* Search Bar */}
          <div className="flex items-center justify-between w-full max-w-md flex-grow">
            <Search url={`/cashier/menu`} search={search} />
          </div>
          <div className="flex w-fit items-center gap-5">
            <Filter className="bg-orange-400" url="/cashier/menu">
              All
            </Filter>
            <Filter className="bg-red-500" path="FOOD" url="/cashier/menu">
              FOOD
            </Filter>
            <Filter className="bg-blue-500" path="SNACK" url="/cashier/menu">
              SNACK
            </Filter>
            <Filter className="bg-green-500" path="DRINK" url="/cashier/menu">
              DRINK
            </Filter>
          </div>
        </div>
        {menu.length == 0 ? (
          <AlertInfo title="informasi">No data Available</AlertInfo>
        ) : (
          <>
            <div className="flex flex-wrap gap-4 justify-evenly">
              {menu.map((data, index) => (
                <div
                  key={`keyPrestasi${index}`}
                  className={`w-1/4 shadow-xl h-96 bg-white border-2 flex flex-col justify-between overflow-hidden border-black rounded-xl`}
                >
                  <div className="relative w-full h-48">
                    <Image
                      layout="fill"
                      objectFit="cover"
                      src={`${BASE_IMAGE_MENU}/${data.picture}`}
                      alt={`${data.name} picture`}
                      className="rounded-t-lg border-black text-black border-b-2"
                      unoptimized
                    />
                  </div>
                  <div className="px-2 py-4 flex flex-col flex-grow">
                    <h1 className="text-xl font-bold">{data.name}</h1>
                    <p className="text-sm mb-2">{data.description}</p>
                    <p className="text-sm">{category(data.category)}</p>
                  </div>
                  <div className="flex items-center justify-between px-2 pb-4 mt-auto">
                    <h2 className="font-semibold">Rp. {data.price}</h2>
                    <QuantityCounter menu={data} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="bg-white w-1/4 py-4 px-2 shadow-xl border-t-4 fixed right-0 border-orange-400 rounded-lg h-[80dvh] ">
        <Cart />
      </div>
    </div>
  );
};
export default OrderPage;

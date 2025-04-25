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
  const search = await (searchParams.search ? searchParams.search.toString() : ``);
  const filterQuery = await (searchParams.category ? searchParams.category.toString() : ``);
  const menu: IMenu[] = filterQuery ? await filterMenu(filterQuery) : await getMenu(search);
  const allMenus: IMenu[] = await getMenu("");

  const category = (cat: string): React.ReactNode => {
    if (cat === "FOOD") {
      return <span className="bg-blue-100 text-red-800 text-md font-medium px-2.5 py-0.5 rounded-full">Food</span>;
    }
    if (cat === "SNACK") {
      return <span className="bg-indigo-100 text-indigo-800 text-md font-medium px-2.5 py-0.5 rounded-full">Snack</span>;
    }
    return <span className="bg-green-100 text-green-800 text-md font-medium px-2.5 py-0.5 rounded-full">Drink</span>;
  };

  return (
    <div className="main-background min-h-screen p-2 flex flex-col lg:flex-row gap-2">
      {/* MENU SECTION */}
      <div className="w-full lg:w-3/4 py-4 px-2 border-t-4 bg-white shadow-xl border-orange-400 rounded-lg">
        <h1 className="text-xl font-bold mb-2">Menu Data</h1>
        <p className="text-sm text-secondary mb-4">
          Halaman ini menampilkan data menu, untuk menambahkan jumlah orderan.
        </p>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="w-full max-w-md">
            <Search url={`/cashier/menu`} search={search} />
          </div>
          <div className="flex flex-wrap gap-2">
            <Filter className="bg-orange-400" url="/cashier/menu">All</Filter>
            <Filter className="bg-red-500" path="FOOD" url="/cashier/menu">FOOD</Filter>
            <Filter className="bg-blue-500" path="SNACK" url="/cashier/menu">SNACK</Filter>
            <Filter className="bg-green-500" path="DRINK" url="/cashier/menu">DRINK</Filter>
          </div>
        </div>

        {menu.length === 0 ? (
          <AlertInfo title="informasi">No data Available</AlertInfo>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {menu.map((data, index) => (
              <div
                key={`keyPrestasi${index}`}
                className="shadow-xl bg-white border-2 border-black rounded-xl flex flex-col overflow-hidden"
              >
                <div className="relative w-full h-48">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={`${BASE_IMAGE_MENU}/${data.picture}`}
                    alt={`${data.name} picture`}
                    className="rounded-t-lg border-b-2 border-black"
                    unoptimized
                  />
                </div>
                <div className="p-3 flex-grow flex flex-col">
                  <h1 className="text-xl font-bold">{data.name}</h1>
                  <p className="text-sm mb-2">{data.description}</p>
                  <div className="mb-2">{category(data.category)}</div>
                  <div className="flex items-center justify-between mt-auto">
                    <h2 className="font-semibold">Rp. {data.price}</h2>
                    <QuantityCounter menu={data} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CART SECTION */}
      <div className="w-full lg:w-1/4 py-4 px-2 shadow-xl border-t-4 border-orange-400 rounded-lg bg-white h-fit sticky top-2">
        <Cart menus={allMenus} />
      </div>
    </div>
  );
};

export default OrderPage;


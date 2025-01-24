import { IUser } from "@/app/types";
import { getCookies } from "@/lib/server-cookie";
import { BASE_API_URL, BASE_IMAGE_PROFILE } from "@/global";
import { get } from "@/lib/api-bridge";
import { AlertInfo } from "@/components/alert/";
import Image from "next/image";
import Search from "./search";

const getUser = async (search: string): Promise<IUser[]> => {
  try {
    const TOKEN = await getCookies("token");
    const url = `${BASE_API_URL}/user/get?search=${search}`;
    const { data } = await get(url, TOKEN);
    let result: IUser[] = [];
    if (data?.status) result = [...data.data];
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const UserPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const search = searchParams.search ? searchParams.search.toString() : ``;
  const user: IUser[] = await getUser(search);

  const role = (cat: string): React.ReactNode => {
    if (cat === "MANAGER") {
      return (
        <span
          className="bg-blue-100 text-yellow-800 text-sm
       font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-500
       dark:text-yellow-100"
        >
          Manager
        </span>
      );
    }

    return (
      <span
        className="bg-blue-100 text-blue-800 text-sm
       font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900
       dark:text-blue-300"
      >
        Cashier
      </span>
    );
  };

  return (
    <div className="main-background p-7 min-h-dvh border-t-primary shadow-md">
      <h4 className="text-xl font-bold mb-2">User Data</h4>
      <p className="text-sm text-secondary mb-4">
        This page displays user data, allowing users to view details, search,
        and manage user by adding, editing, or deleting them.
      </p>
      <div className="flex justify-between items-center mb-4">
        {/* Search Bar */}
        <div className="flex items-center w-full max-w-md flex-grow">
          <Search url={`/manager/user`} search={search} />
        </div>
      </div>
      {user.length == 0 ? (
        <AlertInfo title="informasi">No data Available</AlertInfo>
      ) : (
        <>
          <div className="m-2">
            {user.map((data, index) => (
              <div
                key={`keyPrestasi${index}`}
                className={`flex flex-wrap shadow-lg m-2 px-4 bg-gray-200 rounded-xl`}
              >
                <div className="w-full md:w-1/12 p-2">
                  <small className="text-sm font-bold text-primary">
                    Picture
                  </small>
                  <br />
                  <Image
                    width={40}
                    height={40}
                    src={`${BASE_IMAGE_PROFILE}/${data.profile_picture}` || `😍`}
                    className="text-sm rounded-full overflow-hidden"
                    alt="preview"
                    unoptimized
                  />
                </div>
                <div className="w-full md:w-2/12 p-2">
                  <small className="text-sm font-bold text-primary">Name</small>{" "}
                  <br />
                  {data.name}
                </div>
                <div className="w-full md:w-3/12 p-2">
                  <small className="text-sm font-bold text-primary">
                    Email
                  </small>{" "}
                  <br />
                  {data.email}
                </div>
                <div className="w-full md:w-4/12 p-2">
                  <small className="text-sm font-bold text-primary">
                    Role
                  </small>{" "}
                  <br />
                  {role(data.role)}
                </div>
                <div className="w-full md:w-2/12 p-2">
                  <small className="text-sm font-bold text-primary">
                    Action
                  </small>
                  <br />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default UserPage;

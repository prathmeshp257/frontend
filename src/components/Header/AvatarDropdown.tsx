import { Popover, Transition } from "@headlessui/react";
import {
  UserCircleIcon,
  ChatBubbleBottomCenterTextIcon,
  HeartIcon,
  HomeIcon,
  ArrowRightOnRectangleIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";
import { useNavigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "context/userContext";

const solutions = [
  {
    name: "Account",
    href: "/account",
    icon: UserCircleIcon,
  },
];

const solutionsFoot = [
  {
    name: "Logout",
    icon: ArrowRightOnRectangleIcon,
  },
];

export default function AvatarDropdown() {
  const authContext = useContext(AuthContext);
  const dataAdmin = authContext.userData;
  const url = dataAdmin.image;

  return (
    <div className="AvatarDropdown">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              {/* <Avatar
                sizeClass="w-8 h-8 sm:w-9 sm:h-9"
                imgUrl={url}
              /> */}
              <div className="_3hmsj">
                <div className="_167wsvl" data-profile-menu-open="false">
                  <button
                    type="button"
                    className="cnky2vc atm_1s_glywfm atm_26_1j28jx2 atm_9j_tlke0l atm_bx_1kw7nm4 atm_c8_1kw7nm4 atm_cs_1kw7nm4 atm_gi_idpfg4 atm_ks_ewfl5b atm_r3_1kw7nm4 atm_rd_glywfm atm_vb_1wugsn5 atm_kd_glywfm atm_h_1h6ojuz atm_2d_1hbpp16 atm_3f_gblsx8 atm_5j_1rwtgmb atm_7l_18pqv07 atm_9s_116y0ak atm_e2_12oa1m8 atm_l8_ef04uq atm_mk_h2mmj6 atm_vh_nkobfv atm_uc_x37zl0 atm_wq_kb7nvz atm_g3_qnbkur atm_3f_glywfm_jo46a5 atm_l8_idpfg4_jo46a5 atm_gi_idpfg4_jo46a5 atm_3f_glywfm_1icshfk atm_kd_glywfm_19774hq atm_uc_glywfm__1rrf6b5 atm_uc_ryfd4z_1w3cfyq atm_70_8poa96_1w3cfyq atm_uc_glywfm_1w3cfyq_1rrf6b5 atm_uc_ryfd4z_18zk5v0 atm_70_8poa96_18zk5v0 atm_uc_glywfm_18zk5v0_1rrf6b5 c1r2bm7w atm_70_1841pj7_1nos8r cln384f atm_1ieuuo9_1vi7ecw atm_1dfygl2_fyhuej atm_1lqvdwn_1ul9x4n atm_f4syw5_ftgil2 atm_1255xc1_dlk8xv atm_1ellefq_12etsqc atm_vl4zd4_t94yts dir dir-ltr"
                    aria-expanded="false"
                    aria-label="Main navigation menu"
                    data-testid="cypress-headernav-profile"
                  >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        style={{
                          display: "block",
                          fill: "none",
                          height: "16px",
                          width: "16px",
                          stroke: "currentcolor",
                          strokeWidth: "3",
                          overflow: "visible",
                        }}
                      >
                        <g fill="none">
                          <path d="M2 16h28M2 24h28M2 8h28"></path>
                        </g>
                      </svg>
                      <Avatar sizeClass="w-8 h-8 sm:w-9 sm:h-9" imgUrl={url} />
                  </button>
                </div>
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-[260px] px-4 mt-4 -right-10 sm:right-0 sm:px-0">
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-6 bg-white dark:bg-neutral-800 p-7">
                    {solutions.map((item, index) => (
                      <Link
                        key={index}
                        to={item.href}
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                          <item.icon aria-hidden="true" className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium ">{item.name}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <hr className="h-[1px] border-t border-neutral-300 dark:border-neutral-700" />
                  <div className="relative grid gap-6 bg-white dark:bg-neutral-800 p-7">
                    {solutionsFoot.map((item, index) => (
                      <a
                        key={index}
                        onClick={authContext.onLogout}
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 cursor-pointer"
                      >
                        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                          <item.icon aria-hidden="true" className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium ">{item.name}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

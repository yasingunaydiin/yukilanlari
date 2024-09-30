import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function JobRow() {
  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-sm relative">
        <div className="absolute top-4 cursor-pointer right-4">
          <FontAwesomeIcon className="size-5 text-gray-400" icon={faHeart} />
        </div>
        <div className="flex grow gap-4">
          <div className="content-center">
            {/*Add emoji here from the category*/}
          </div>
          <div className="grow sm:flex">
            <div className="grow">
              <div className="text-gray-500 text-sm">BMC</div>
              <div className="font-bold">Teker</div>
              <div className="text-gray-500 text-sm">
                Parçalar &middot; 10 Ton &middot; Istanbul, Turkiye &#62; Konya,
                Turkiye
              </div>
            </div>
            <div className="content-end text-gray-500 text-sm">2 weeks ago</div>
          </div>
        </div>
      </div>
    </>
  );
}

import React from 'react'

function Ads() {
  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 mb-10  rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Ads</h5>
        <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            See all
        </a>
  </div>

  <div style={{ display: 'grid',gridTemplateColumns: '2fr 3fr'}} className="  gap-4 ">
          <div className="">
              <img className="w-18 h-18 rounded-lg " src="https://uno.ma/pub/media/catalog/product/cache/af8d7fd2c4634f9c922fba76a4a30c04/l/d/ld0005895002_1_1.jpeg" alt="Neil image"/>
          </div>
          <a style={{alignSelf:'center'}} href="#"  >
              <h6 className=" text-lg font-semibold  tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case</h6>
          </a>

          <div >
              <img className="w-18 h-18 rounded-lg "src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202401/redmi-note-13-pro-5g-141901114-1x1_0.png?VersionId=62GXnMb51hyqURDcEOWyvDhwMOeHOcs0"  alt="Neil image"/>
          </div>
          <a style={{alignSelf:'center'}} href="#">
              <h6 className="text-lg font-semibold  tracking-tight text-gray-900 dark:text-white">Redmi Note 13 Pro Multipliez l'extraordinaire</h6>
          </a>
  </div>

</div>
  )
}

export default Ads

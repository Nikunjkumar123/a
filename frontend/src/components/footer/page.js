import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import verifiedImage from '../../img/verified.webp'
import payImage from '../../img/pay.webp'
import logo from '../../img/Aikon-logo.webp'
import bestProductlImage from '../../img/best-prodect.webp'
import { ShoppingBagIcon, BuildingOfficeIcon, DevicePhoneMobileIcon, EnvelopeIcon, LinkIcon } from '@heroicons/react/24/outline'
import { toast } from 'sonner'
import { axiosInstance } from '@/app/account/page'

export const Footer = () => {
  const [year, setYear] = useState(null);


  const [categoryNames, setCategoryNames] = useState([]);

  const fetchMainCategory = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/products/mainCategory?limit=4');
      const categories = response?.data?.msg || [];
      let categoryData=[]
      categories.forEach(category => {
        categoryData.push(category.name); 
      });
      setCategoryNames([ ...categoryData]);
    
    } catch (error) {
      toast.error('Failed to load categories.');
      console.error(error);
    }
  };

  useEffect(()=>{
    fetchMainCategory()
    setYear(new Date().getFullYear());

  },[])
  return (
    <div className="bg-gray-200 container-fluid z-10 text-black">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Company Info */}
          <div className="flex flex-col space-y-4">
            <Image 
              src={logo}
              width={56}
              height={56}
              alt="Aikon Sports Logo"
              className="w-14 h-auto"
            />
            <h2 className="text-lg font-semibold">Aikon Sports</h2>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2">
                <BuildingOfficeIcon className="w-5 h-5" />
                <span>Lajpat Nagar, Delhi 110086</span>
              </div>
              <div className="flex items-center space-x-2">
                <DevicePhoneMobileIcon className="w-5 h-5" />
                {/* <span>+91 1234567890</span> */}
              </div>
              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="w-5 h-5" />
                <span>contact@aikonsports.com</span>
              </div>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/term">Terms & Conditions</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 3 - Categories */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="space-y-2">
              {
                categoryNames && categoryNames.length>0 && categoryNames.map((category, index) => (
                  <li key={index}><Link href={`/shop/maincategory=${category}`}>{category.charAt(0).toUpperCase() + category.slice(1)}</Link></li>
                ))
              }
              
            </ul>
          </div>

          {/* Column 4 - Certifications */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Certifications</h3>
            <div className="grid grid-cols-2 gap-4">
              <Image 
                src={verifiedImage}
                width={100}
                height={100}
                alt="Verified"
                className="w-[150] h-auto sm:w-1/2"
              />
              <Image 
                src={bestProductlImage}
                width={100}
                height={100}
                alt="Best Product"
                className="h-auto w-[200] sm:w-1/2"
              />
              <Image 
                src={payImage}
                width={100}
                height={100}
                alt="Payment Methods"
                className="w-full h-auto col-span-2"
              />
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="relative py-4  border-t bg-gray-200 border-gray-200 text-center">
      <p>© {year ? `${year}` : ''} Aikon Sports. All rights reserved.</p>
      <Link href={'/cart'}>
      <ShoppingBagIcon className="fixed z-10 text-blue-900 bottom-40 right-2 bg-white rounded-md shadow p-2 hover:shadow-lg hover:scale-105"
      height={50}
        width={50}
      />
      </Link>
    </div>
      </div>
    </div>

    
  )
}

export default Footer;
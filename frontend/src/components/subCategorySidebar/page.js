import { axiosInstance } from '@/app/account/page';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const SubCategorySidebar = ({ onSelectSubCategory }) => {
  const [mainCategory, setMainCategory] = useState({});
  const [activeSubCategory, setActiveSubCategory] = useState(null);
const router=useRouter()
  const fetchMainCategory = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/products/mainCategory');
      const categories = response?.data?.msg || [];
      
      // Transform data to the expected structure
      const categoryMap = categories.reduce((acc, category) => {
        acc[category.name] = category.subCategory.map((sub) => sub.name);
        return acc;
      }, {});

      setMainCategory(categoryMap);
    } catch (error) {
      toast.error('Failed to load categories.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMainCategory();
  }, []);

  const handleSubCategoryClick = (sub) => {
    setActiveSubCategory(sub);
    // onSelectSubCategory(sub);  
    router.push(`/shop/subcategory=${sub}`);
  };

  const handleCategoryClick = (category) => {
    setActiveSubCategory(null);
    router.push(`/shop/maincategory=${category}`);
  };
  return (
    <div className="w-64 h-full bg-gradient-to-b from-white to-gray-50 p-6 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
        Categories
      </h2>
      {Object.entries(mainCategory).map(([category, subs]) => (
        <div key={category} className="mb-6">
          <h3 className="font-semibold text-lg mb-3 text-gray-700 flex items-center cursor-pointer hover:text-gray-800" onClick={()=>handleCategoryClick(category)}>
            <span className="w-1 h-5 bg-blue-500 rounded mr-2"></span>
            {category}
          </h3>
          <ul className="pl-3 space-y-2">
            {subs.map((sub) => (
              <li
                key={sub}
                className={`py-2 px-3 cursor-pointer rounded-md transition-all duration-200 hover:bg-blue-50 
                  ${
                    activeSubCategory === sub
                      ? 'bg-blue-100 text-blue-600 font-medium shadow-sm'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                onClick={() => handleSubCategoryClick(sub)}
              >
                <div className="flex items-center">
                  <svg
                    className={`w-4 h-4 mr-2 ${
                      activeSubCategory === sub ? 'text-blue-500' : 'text-gray-400'
                    }`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                  {sub}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SubCategorySidebar;

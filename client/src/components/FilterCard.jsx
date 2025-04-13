import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full rounded-2xl p-5 bg-white shadow-md border">
      <h1 className="font-bold text-xl text-gray-800 mb-4">Filter Jobs</h1>
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-lg font-semibold text-purple-700 mb-3 border-b pb-1">
              {data.filterType}
            </h2>
            <div className="space-y-2">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 transition hover:bg-gray-50 p-2 rounded-md"
                  >
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className="border-gray-400 text-purple-700 focus:ring-purple-500"
                    />
                    <Label
                      htmlFor={itemId}
                      className="text-gray-700 cursor-pointer hover:text-purple-700"
                    >
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;

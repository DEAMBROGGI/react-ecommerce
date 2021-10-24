import { FilterRounded } from "@mui/icons-material";
import  { useState } from "react";
import {useStateValue} from '../StateProvider';


function usePaginationFilter( itemsPerPage) {
const [{filterProducts},dispatch] = useStateValue();
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(filterProducts?.length / 6);

  function currentData() {
    const begin = (currentPage - 1) * 6;
    const end = begin + 6;
    return filterProducts?.slice(begin, end);
  }

  function next() {
    setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(currentPage => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
}

export default usePaginationFilter;

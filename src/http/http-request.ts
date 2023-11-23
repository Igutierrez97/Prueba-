
import axios from 'axios';
import { Rol } from '../interfaces/rol';




export const postData = (payload:Rol[]) => {
  return axios.post( `${process.env.URL}`, payload);
}


export const updateData = (roles:Rol[]) => {
    const updateRequests = roles.map(role => {
      return axios.put(`${process.env.URL}/${role.id}`, role);
    });
  
    return Promise.all(updateRequests);
  }


export const deleteData = (ids:string[]) => {
    const deleteRequests = ids.map(id => {
      return axios.delete(`${process.env.URL}${id}`);
    });
  
    return Promise.all(deleteRequests);
  }
  

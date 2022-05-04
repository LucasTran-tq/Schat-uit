// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract User {
    struct Inf {
        string phone1;
        string hoten1;
    } 
mapping(string => Inf) public user;
// thêm họ tên và sdt vào blockchain
function add(string memory _phone,string memory _hoten)public returns(bool){
    Inf memory inf = user[_phone];
    if(keccak256(abi.encodePacked(inf.phone1)) != keccak256(abi.encodePacked(""))){
  return(false);
        }
        user[_phone] = Inf({
        phone1: _phone,
        hoten1: _hoten

    });
    return true;

  

   // check có sdt này hay chưa, chưa có thì thêm vào     
}
// đưa vào sdt trả về sdt + họ tên, nếu sdt không tồn tại thì thông báo, tồn tại thì trả về sdt + họ tên
function get(string memory _phone)
    public
    view
    returns  (string memory phone,
            string memory hoten,
            bool
            )
    {
       Inf memory inf = user[_phone];
        if (
            keccak256(abi.encodePacked(inf.phone1)) ==  keccak256(abi.encodePacked(""))
        ) return ("sdt khong ton tai","ho ten khong ton tai",false);
        return(inf.phone1,inf.hoten1,true);
    }
       function userExists(string memory _phone) public view returns (bool) {
        Inf memory inf = user[_phone];
        if (
            keccak256(abi.encodePacked(inf.phone1)) ==
            keccak256(abi.encodePacked(""))
        ) return false;
        return true;
    } 
}
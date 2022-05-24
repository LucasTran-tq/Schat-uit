pragma solidity ^0.6.0;

contract UserContract {

    mapping(string => string) internal users;

    //
    string[] user_list;

    // add events

    // create
    function createUser(string memory _userId, string memory _pubKey) public {
        users[_userId] = _pubKey;

        //
        user_list.push(_userId);
        // Event
    }

    function getUser(string memory _userId) public view returns (string memory) {
        return users[_userId];
    }

    // // Function to retrieve 
    //  // values from the mapping
    //  function getUserList(
    //  ) view public returns (string[] memory) {
    //     return user_list;
    // }

    function getUserByIndex(uint256 _index) public view returns(string memory) {
        return user_list[_index];
    }
  
    // Function to count number 
    // of values in a mapping
    function countUserInList(
    ) view public returns (uint) {
        return user_list.length;
    }

}

// contract UserContract {
//     // struct
//     struct S_User {
//         uint256 _phoneNumber;
//         string _pubKey;
//     }

//     uint256 index;

//     // add events

//     // get specific user
//     mapping(uint256 => S_User) public users;

//     // create
//     function createUser(uint256 _phoneNumber, string memory _pubKey) public {
//         users[index] = S_User(_phoneNumber, _pubKey);
//         // Event

//         index++;
//     }

//     // get user by phoneNumber
//     function getUserByPhoneNumber(uint256 _phoneNumber) public {

//     }
// }

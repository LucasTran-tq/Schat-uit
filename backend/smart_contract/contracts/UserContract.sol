pragma solidity ^0.6.0;

contract UserContract {

    // mapping(userId, publickey)
    mapping(string => string) internal users;

    string[] user_list;

    // EVENT
    event UserEvent(string _userId, string _pubKey, uint256 index);

    function createUser(string memory _userId, string memory _pubKey) public {
        users[_userId] = _pubKey;

        user_list.push(_userId);

        // Event
        emit UserEvent(_userId, _pubKey, uint256(user_list.length - 1));
    }

    function getUser(string memory _userId)
        public
        view
        returns (string memory)
    {
        return users[_userId];
    }

    // // Function to retrieve
    //  // values from the mapping
    //  function getUserList(
    //  ) view public returns (string[] memory) {
    //     return user_list;
    // }

    function getUserByIndex(uint256 _index)
        public
        view
        returns (string memory)
    {
        require(user_list.length >= _index, 'Amount of user is smaller');
        return user_list[_index];
    }

    function countUserInList() public view returns (uint256) {
        return user_list.length;
    }
}

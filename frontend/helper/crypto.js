// var EC = require('elliptic').ec;
// var ec = new EC('curve25519');

// var A = ec.genKeyPair();
// var B = ec.genKeyPair();
// var C = ec.genKeyPair();

// var AB = A.getPublic().mul(B.getPrivate())
// var BC = B.getPublic().mul(C.getPrivate())
// var CA = C.getPublic().mul(A.getPrivate())

// var ABC = AB.mul(C.getPrivate())
// var BCA = BC.mul(A.getPrivate())
// var CAB = CA.mul(B.getPrivate())

// console.log(ABC.getX().toString(16))
// console.log(BCA.getX().toString(16))
// console.log(CAB.getX().toString(16))
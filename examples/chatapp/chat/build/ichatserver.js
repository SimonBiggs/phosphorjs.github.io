"use strict";
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var chat;
(function (chat) {
    var createToken = phosphor.di.createToken;
    /**
     * The interface token for IChatServer.
     */
    chat.IChatServer = createToken('chat.IChatServer');
})(chat || (chat = {})); // module chat

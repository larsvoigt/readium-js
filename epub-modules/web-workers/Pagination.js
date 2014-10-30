define(['module'], function (module) {

    var paginationWorker = function (openBookData, readerOptions) {

        var worker = undefined;

        this.createDefaultPagination = function (callbacks) {

            if (!openBookData) {
                console.error("missing openBookData");
                return;
            }

            if (!readerOptions) {
                console.error("missing readerOptions");
                return;
            }

            var pWorker = module.config().pWorker;
            console.debug("worker path: " + pWorker)
            worker = new Worker(pWorker);

            worker.postMessage(
                {'cmd': 'create',
                'openBookData':  JSON.stringify(openBookData),
                'readerOptions': JSON.stringify(readerOptions)}
            );

//        worker.onmessage = function (evt) {
//            var data = evt.data;
//            switch (data.msg) {
//                case Messages.SUCCESS:
//                    if (callbacks.success) {
//                    }
//                    cleanUp();
//                    break;
//                case Messages.PROGRESS:
//                    if (callbacks.progress) {
//                        callbacks.progress(data.percent, data.progressType, data.progressData);
//                    }
//                    break;
//                default:
//                    error(data.errorMsg || "Unknown error");
//                    cleanUp();
//            }
//        }
//
//        worker.onerror = function () {
//            console.error(arguments)
//        }
        };
//    worker.postMessage(data);


        var cleanUp = function () {
            worker.terminate();
            worker = null;
        }
    }
    return paginationWorker;
});

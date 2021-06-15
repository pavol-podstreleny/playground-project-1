using CustomerAPI.Utils;
using Xunit;
using Xunit.Abstractions;

namespace CustomerAPI.Test.Utils {
    
    public class StorageTableConnectionConfigTest {

        private readonly ITestOutputHelper _output;

        public StorageTableConnectionConfigTest(ITestOutputHelper output){
            this._output = output;
        }

        [Theory]
        [InlineData("AccountKey=1234","DefaultEndpointsProtocol=1525","TableEndpoint=http://localhost","DefaultEndpointsProtocol=1525;AccountKey=1234;TableEndpoint=http://localhost;")]
        [InlineData("AccountKey=asdfadf","DefaultEndpointsProtocol=adsfasdf123","","DefaultEndpointsProtocol=adsfasdf123;AccountKey=asdfadf;;")]
        [InlineData("","","",";;;")]
        [InlineData(null,null,null,";;;")]
        [InlineData(null,"DefaultEndpointsProtocol=adsfasdf123","","DefaultEndpointsProtocol=adsfasdf123;;;")]
        [InlineData(null,"\n=adsfasdf123","","\n=adsfasdf123;;;")]
        public void TestStorageTableConnectionString(string accountKey, string defaultProtocol, string tableEndpoint, string expected)
        {
            var storageConfig = new StorageTableConnectionConfig{
                AccountKey=accountKey,
                DefaultEndpointsProtocol=defaultProtocol,
                TableEndpoint=tableEndpoint
            };
            _output.WriteLine(expected);

            Assert.Equal(expected,storageConfig.GetConnectionString());
        }

    

    }
}
namespace CustomerApi.Utils
{
    public interface IOneWayMapper<ENTITY_IN, ENTITY_OUT>
    {
        public ENTITY_OUT Map(ENTITY_IN entity);
    }
}
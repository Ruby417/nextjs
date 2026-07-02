import DashboardSkeleton from '@/app/ui/skeletons';

export default function Loading(){
    //return <div>Loading...</div>;
    return <DashboardSkeleton />; //takes time in loading the data from the database, so we can use a skeleton component to show a loading state while the data is being fetched.
}
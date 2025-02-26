import { SaleDTO } from "../../DTO/SaleDTO"
import { SaleDayDTO } from "../../DTO/SaleDayDTO";
import { SaleStatusEnum } from "../../enums/SaleStatusEnum";
import { useMainContext } from "../../contexts/MainContext";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


function transformData(data: SaleDTO[] | null | undefined): SaleDayDTO[] {
    const days = data?.reduce((acumulator: { [key: string]: SaleDayDTO }, item) => {
      const day = item.date.split(' ')[0];
  
      if (!acumulator[day]) {
        const saleDay = {} as SaleDayDTO;
        saleDay.date = day
        saleDay.paid = 0
        saleDay.failed = 0
        saleDay.processing = 0
        
        acumulator[day] = saleDay;
      }
  
      switch(SaleStatusEnum[item.status]) {
        case SaleStatusEnum[SaleStatusEnum.PAID]: {
            acumulator[day]["paid"] += item.price;
            break;
        }
        case SaleStatusEnum[SaleStatusEnum.PROCESSING]: {
            acumulator[day]["processing"] += item.price;
            break;
        }
        default: {
            acumulator[day]["failed"] += item.price;
        }

      }
      
      return acumulator;
    }, {});

    if (days) {
        return Object.values(days).map(day => ({...day, date: day.date.substring(5)}))
    }
  
    return [];
  }

  
export default function SalesGraph(): JSX.Element {
    const { data } = useMainContext();
    const transformedData = transformData(data);
    
    return (
        <div>
            <ResponsiveContainer height={400} width={'99%'}>
                <LineChart
                    width={500}
                    height={200}
                    data={transformedData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}>
                    <Legend />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="paid"
                        stroke="#A36AF9"
                        strokeWidth={3} />
                    <Line
                        type="monotone"
                        dataKey="processing"
                        stroke="#FBCB21"
                        strokeWidth={3} />
                    <Line 
                        type="monotone" 
                        dataKey="failed" 
                        stroke="#000" 
                        strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
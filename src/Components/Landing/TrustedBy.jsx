import { trustedBy } from "../../Constants/api";

const TrustedBy = () => {

    return (
        <div className="mt-4 flex flex-wrap gap-5 justify-around">
            {
                Object.entries(trustedBy).map(([title, image], index) => {
                    return (
                        <div key={index} className="flex w-32">
                            <img alt={title} src={image} className="object-contain"/>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TrustedBy

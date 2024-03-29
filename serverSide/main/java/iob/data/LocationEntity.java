package iob.data;

import java.util.Objects;

public class LocationEntity {
	
	private double lat;
	private double lng;
	
	public LocationEntity() {}
	
		
	public LocationEntity(double lat, double lng) {
		super();
		this.lat = lat;
		this.lng = lng;
	}

	public double getLat() {
		return lat;
	}
	public void setLat(double lat) {
		this.lat = lat;
	}
	public double getLng() {
		return lng;
	}
	public void setLng(double lng) {
		this.lng = lng;
	}


	@Override
	public String toString() {
		return "Location [lat=" + lat + ", lng=" + lng + "]";
	}


	@Override
	public int hashCode() {
		return Objects.hash(lat, lng);
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		LocationEntity other = (LocationEntity) obj;
		return Double.doubleToLongBits(lat) == Double.doubleToLongBits(other.lat)
				&& Double.doubleToLongBits(lng) == Double.doubleToLongBits(other.lng);
	}
	
	

}
